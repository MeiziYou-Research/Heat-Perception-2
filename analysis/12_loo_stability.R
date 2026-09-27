# Leave-one-city-out stability of the leading candidate and correlate family.
# Usage: Rscript 12_loo_stability.R <restricted_city_model_input.csv>
#        <all_specs_aggregate_results.csv> <private_output_directory>
# The fold-level file records excluded city names and must remain private.

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 3L) stop("Expected city input, aggregate results, output directory")
city <- read.csv(args[[1]], check.names = FALSE, stringsAsFactors = FALSE)
models <- read.csv(args[[2]], stringsAsFactors = FALSE)
output_dir <- args[[3]]
dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
if (nrow(city) != 50L) stop("Expected 50 cities")
city$country <- factor(city$country)

continuous <- c("ClimateNeutral", "E24_Joy", "H41_Fear", "E11_Neutral",
                "E11_Surprise", "SysFear", "E23_Sad", "HealthFear",
                "H21_Fear", "E33_Joy", "V41_Neutral", "E21_Sad")
binary <- c("E11_Abnormality", "E31_JoyDominant", "E32_Surprise_bin",
            "V11_Anger_bin", "V21_Fear_bin")
candidates <- unique(models$candidate_correlate[models$control_spec == "country"])
if (length(candidates) < 30L) stop("Candidate list is unexpectedly short")

family <- function(name) {
  if (name %in% c("dtr", "temp", "hot_day_days_m2", "hot_night_days_m2"))
    return("Climatic heat regime")
  if (name %in% c("ndvi", "gexpo1km", "nightlight", "gini_summe"))
    return("Urban environmental structure")
  if (name %in% c("income_z", "pop", "prop_over65"))
    return("Socio-demographic context")
  if (name %in% c("cgi", "tgi", "hgi"))
    return("Governance")
  if (grepl("^(c_|p_|w_)", name)) return("15-min accessibility")
  stop("Unmapped candidate family: ", name)
}

baseline <- models[models$control_spec == "country" &
                     models$candidate_correlate %in% candidates, ]
full_winner <- setNames(character(length(c(continuous, binary))), c(continuous, binary))
for (outcome in names(full_winner)) {
  rows <- baseline[baseline$outcome == outcome, ]
  effect <- if (outcome %in% binary) "incremental_fit" else "partial_r2"
  rows <- rows[order(-rows[[effect]], rows$candidate_correlate), ]
  full_winner[[outcome]] <- rows$candidate_correlate[[1]]
}

fold_rows <- vector("list", nrow(city) * length(full_winner))
index <- 0L
for (outcome in names(full_winner)) {
  is_binary <- outcome %in% binary
  for (excluded_index in seq_len(nrow(city))) {
    fold <- city[-excluded_index, , drop = FALSE]
    fold$country <- droplevels(factor(fold$country))
    dat <- data.frame(y = fold[[outcome]], log_n = fold$log_n,
                      country = fold$country)
    if (is_binary) {
      fit_null <- suppressWarnings(glm(y ~ 1, data = dat, family = binomial()))
      fit_controls <- suppressWarnings(glm(y ~ log_n + country,
                                           data = dat, family = binomial()))
      ll_null <- as.numeric(logLik(fit_null))
      r2_controls <- 1 - as.numeric(logLik(fit_controls)) / ll_null
    } else {
      fit_controls <- lm(y ~ log_n + country, data = dat)
      rss_controls <- sum(residuals(fit_controls)^2)
    }
    effects <- rep(NA_real_, length(candidates))
    for (j in seq_along(candidates)) {
      candidate <- candidates[[j]]
      x <- as.numeric(fold[[candidate]])
      sx <- sd(x, na.rm = TRUE)
      if (!is.finite(sx) || sx == 0) next
      dat$xz <- (x - mean(x, na.rm = TRUE)) / sx
      fit <- tryCatch(suppressWarnings(
        if (is_binary) glm(y ~ xz + log_n + country, data = dat, family = binomial())
        else lm(y ~ xz + log_n + country, data = dat)), error = function(e) NULL)
      if (is.null(fit)) next
      effects[[j]] <- if (is_binary) {
        (1 - as.numeric(logLik(fit)) / ll_null) - r2_controls
      } else {
        (rss_controls - sum(residuals(fit)^2)) / rss_controls
      }
    }
    if (all(is.na(effects))) stop("All candidates failed for ", outcome)
    finite_effects <- effects[is.finite(effects)]
    winner <- candidates[[which.max(effects)]]
    runner_up <- sort(finite_effects, decreasing = TRUE)[[2]]
    winner_score <- max(finite_effects)
    index <- index + 1L
    fold_rows[[index]] <- data.frame(
      outcome = outcome, excluded_country = city$country[[excluded_index]],
      excluded_city = city$city[[excluded_index]],
      full_correlate = full_winner[[outcome]], fold_correlate = winner,
      leading_fit = winner_score, runner_up_fit = runner_up,
      winning_margin = winner_score - runner_up,
      full_family = family(full_winner[[outcome]]), fold_family = family(winner),
      exact_preserved = as.integer(winner == full_winner[[outcome]]),
      family_preserved = as.integer(family(winner) == family(full_winner[[outcome]]))
    )
  }
}
folds <- do.call(rbind, fold_rows)
summary <- aggregate(cbind(exact_preserved, family_preserved) ~ outcome,
                     data = folds, FUN = sum)
summary$n_folds <- 50L
summary$full_correlate <- full_winner[summary$outcome]
summary$full_family <- vapply(summary$full_correlate, family, character(1))
write.csv(folds, file.path(output_dir, "loo_folds_RESTRICTED.csv"), row.names = FALSE)
write.csv(summary, file.path(output_dir, "loo_summary.csv"), row.names = FALSE)
cat("Wrote", nrow(folds), "fold rows and", nrow(summary), "summary rows\n")
 # Numbered public analysis script.
