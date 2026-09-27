# Figure 6b partial-regression points and 95% fitted-mean confidence bands.
# Usage: Rscript 08_partial_regression.R <restricted_city_model_input.csv>
#        <ranked_continuous.csv> <private_output_directory>
# The city-level point file is restricted and must not be published.

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 3L) stop("Expected city input, ranking file, output directory")
city <- read.csv(args[[1]], check.names = FALSE, stringsAsFactors = FALSE)
ranked <- read.csv(args[[2]], stringsAsFactors = FALSE)
output_dir <- args[[3]]
dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
if (nrow(city) != 50L) stop("Expected 50 city rows")
city$country <- factor(city$country)

outcomes <- c("E11_Neutral", "E11_Surprise", "E21_Sad", "E23_Sad",
              "E24_Joy", "E33_Joy", "HealthFear", "ClimateNeutral", "SysFear")
selected <- ranked[ranked$rank == 1L & ranked$outcome %in% outcomes, ]
if (nrow(selected) != 9L || anyDuplicated(selected$outcome)) {
  stop("Expected one leading correlate for each of nine Fig. 6b outcomes")
}

point_rows <- list()
band_rows <- list()
summary_rows <- list()
for (outcome in outcomes) {
  correlate <- selected$candidate_correlate[selected$outcome == outcome]
  predictor <- paste0(correlate, "_z")
  keep <- c("country", "city", "log_n", outcome, predictor)
  dat <- city[complete.cases(city[, keep]), keep, drop = FALSE]
  names(dat)[4:5] <- c("y", "xz")
  dat$country <- droplevels(factor(dat$country))
  if (nrow(dat) < 10L) stop("Too few cities for ", outcome)
  fit_y_controls <- lm(y ~ log_n + country, data = dat)
  fit_x_controls <- lm(xz ~ log_n + country, data = dat)
  fit_full <- lm(y ~ xz + log_n + country, data = dat)
  dat$y_res <- residuals(fit_y_controls)
  dat$x_res <- residuals(fit_x_controls)
  dat$outcome <- outcome
  dat$correlate <- correlate
  point_rows[[outcome]] <- dat[c("outcome", "correlate", "country", "city",
                                "x_res", "y_res")]

  rss_controls <- sum(residuals(fit_y_controls)^2)
  rss_full <- sum(residuals(fit_full)^2)
  coefficient <- summary(fit_full)$coefficients["xz", ]
  summary_rows[[outcome]] <- data.frame(
    outcome = outcome, correlate = correlate, n_cities = nrow(dat),
    partial_r2 = (rss_controls - rss_full) / rss_controls,
    p_value = coefficient[["Pr(>|t|)"]]
  )

  x_reference <- as.numeric(fitted(fit_x_controls))
  control_reference <- mean(as.numeric(fitted(fit_y_controls)))
  x_grid <- seq(max(-3, min(dat$x_res)), min(3, max(dat$x_res)), length.out = 90L)
  critical <- qt(0.975, df = df.residual(fit_full))
  covariance <- vcov(fit_full)
  coefficients <- coef(fit_full)
  rows <- lapply(x_grid, function(x_value) {
    reference <- dat
    reference$xz <- x_reference + x_value
    design <- model.matrix(delete.response(terms(fit_full)), data = reference,
                           contrasts.arg = fit_full$contrasts)
    average_design <- colMeans(design)[names(coefficients)]
    fitted_mean <- sum(average_design * coefficients) - control_reference
    se <- sqrt(drop(t(average_design) %*% covariance %*% average_design))
    data.frame(outcome = outcome, correlate = correlate, x_res = x_value,
               fitted_residual = fitted_mean, lower_95 = fitted_mean - critical * se,
               upper_95 = fitted_mean + critical * se)
  })
  band_rows[[outcome]] <- do.call(rbind, rows)
}

write.csv(do.call(rbind, summary_rows),
          file.path(output_dir, "Fig6b_summary.csv"), row.names = FALSE)
write.csv(do.call(rbind, point_rows),
          file.path(output_dir, "Fig6b_points_RESTRICTED.csv"), row.names = FALSE)
write.csv(do.call(rbind, band_rows),
          file.path(output_dir, "Fig6b_band.csv"), row.names = FALSE)
cat("Wrote 9 summaries, 450 restricted city points and 810 band rows\n")
 # Numbered public analysis script.
