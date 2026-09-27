# Exploratory city-level screening under the final main specification.
# Usage: Rscript 06_screening_models.R <restricted_city_model_input.csv> <aggregate_output.csv>
# The input is generated locally by 05_prepare_model_input.py and is not released.

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 2L) stop("Expected input and output CSV paths")

city <- read.csv(args[[1]], check.names = FALSE, stringsAsFactors = FALSE)
if (nrow(city) != 50L) stop("Expected 50 cities")
city$country <- factor(city$country)
if ("koppen_subtype_confirmed" %in% names(city)) {
  city$koppen_subtype_confirmed <- factor(city$koppen_subtype_confirmed)
}

continuous <- c(
  "E11_Surprise", "E11_Neutral", "E21_Sad", "E23_Sad", "E24_Joy",
  "E33_Joy", "H21_Fear", "H41_Fear", "HealthFear", "V41_Neutral",
  "ClimateNeutral", "SysFear"
)
binary <- c(
  "E11_Abnormality", "E31_JoyDominant", "E32_Surprise_bin",
  "V11_Anger_bin", "V21_Fear_bin"
)
candidate_names <- c(
  "cgi", "hgi", "tgi", "temp", "dtr", "hot_night_days_m2",
  "hot_day_days_m2", "income_z", "ndvi",
  "nightlight", "gini_summe", "gexpo1km", "prop_over65",
  "w_health", "w_communit", "w_educatio", "w_food", "w_nightlif",
  "w_mobility", "w_active", "w_pois", "p_health", "p_communit",
  "p_educatio", "p_food", "p_nightlif", "p_mobility", "p_active",
  "p_pois", "c_health", "c_communit", "c_educatio", "c_food",
  "c_nightlif", "c_mobility", "c_active", "c_pois", "pop"
)
candidate_names <- candidate_names[paste0(candidate_names, "_z") %in% names(city)]

specifications <- list(
  logn = c("log_n"),
  country = c("log_n", "country")
)
if ("koppen_subtype_confirmed" %in% names(city)) {
  specifications$both_subtype <- c("log_n", "country", "koppen_subtype_confirmed")
}

fit_one <- function(outcome, candidate, is_binary, spec_name, controls) {
  predictor <- paste0(candidate, "_z")
  keep <- c(outcome, predictor, controls)
  dat <- city[complete.cases(city[, keep]), keep, drop = FALSE]
  names(dat)[1:2] <- c("y", "xz")
  if ("country" %in% names(dat)) dat$country <- droplevels(factor(dat$country))
  if ("koppen_subtype_confirmed" %in% names(dat)) {
    dat$koppen_subtype_confirmed <- droplevels(factor(dat$koppen_subtype_confirmed))
  }
  if (nrow(dat) < 5L || length(unique(dat$y)) < 2L) {
    return(data.frame(outcome = outcome, control_spec = spec_name,
                      candidate_correlate = candidate,
                      n_cities = nrow(dat), warning = "Insufficient observations"))
  }
  controls_formula <- as.formula(paste("y ~", paste(controls, collapse = " + ")))
  full_formula <- as.formula(paste("y ~", paste(c("xz", controls), collapse = " + ")))
  if (is_binary) {
    fit_null <- glm(y ~ 1, data = dat, family = binomial())
    fit_controls <- glm(controls_formula, data = dat, family = binomial())
    fit_full <- glm(full_formula, data = dat, family = binomial())
    ll_null <- as.numeric(logLik(fit_null))
    effect <- (1 - as.numeric(logLik(fit_full)) / ll_null) -
      (1 - as.numeric(logLik(fit_controls)) / ll_null)
    coefficients <- summary(fit_full)$coefficients
    beta <- coefficients["xz", "Estimate"]
    se <- coefficients["xz", "Std. Error"]
    return(data.frame(
      outcome = outcome, control_spec = spec_name,
      candidate_correlate = candidate,
      n_cities = nrow(dat), incremental_fit = effect,
      p_value = coefficients["xz", "Pr(>|z|)"], coefficient = beta,
      odds_ratio = exp(beta), ci_low = exp(beta - 1.96 * se),
      ci_high = exp(beta + 1.96 * se),
      warning = if (isTRUE(fit_full$converged)) "" else "Non-converged"
    ))
  }
  fit_controls <- lm(controls_formula, data = dat)
  fit_full <- lm(full_formula, data = dat)
  rss_controls <- sum(residuals(fit_controls)^2)
  rss_full <- sum(residuals(fit_full)^2)
  coefficients <- summary(fit_full)$coefficients
  data.frame(
    outcome = outcome, control_spec = spec_name,
    candidate_correlate = candidate,
    n_cities = nrow(dat), partial_r2 = (rss_controls - rss_full) / rss_controls,
    p_value = coefficients["xz", "Pr(>|t|)"],
    coefficient = coefficients["xz", "Estimate"], warning = ""
  )
}

rows <- vector("list", (length(continuous) + length(binary)) *
                length(candidate_names) * length(specifications))
index <- 0L
for (spec_name in names(specifications)) {
  for (outcome in c(continuous, binary)) {
    for (candidate in candidate_names) {
      index <- index + 1L
      rows[[index]] <- tryCatch(
        suppressWarnings(fit_one(outcome, candidate, outcome %in% binary,
                                 spec_name, specifications[[spec_name]])),
        error = function(e) data.frame(outcome = outcome, control_spec = spec_name,
                                      candidate_correlate = candidate,
                                      warning = paste("FIT FAILED:", conditionMessage(e)))
      )
    }
  }
}
result <- do.call(rbind, lapply(rows, function(row) {
  for (col in c("n_cities", "partial_r2", "incremental_fit", "p_value",
                "coefficient", "odds_ratio", "ci_low", "ci_high", "warning")) {
    if (!col %in% names(row)) row[[col]] <- NA
  }
  row[c("outcome", "control_spec", "candidate_correlate", "n_cities", "partial_r2",
        "incremental_fit", "p_value", "coefficient", "odds_ratio",
        "ci_low", "ci_high", "warning")]
}))
write.csv(result, args[[2]], row.names = FALSE)
cat("Wrote", nrow(result), "aggregate screening rows\n")
 # Numbered public analysis script.
