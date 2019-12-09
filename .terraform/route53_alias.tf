resource "aws_route53_record" "sprint_dev" {
  zone_id = "ZW3RHVHS7GM6X"
  name    = "sprint-dev.dstbtd.dev"
  type    = "A"

  alias {
    name    = "${aws_cloudfront_distribution.sprint_dev_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.sprint_dev_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "sprint_staging" {
  zone_id = "ZW3RHVHS7GM6X"
  name    = "sprint-staging.dstbtd.dev"
  type    = "A"

  alias {
    name    = "${aws_cloudfront_distribution.sprint_staging_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.sprint_staging_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "sprint_prod" {
  zone_id = "Z3J8W19OFQ9VTR"
  name    = "sprint.distributed.co"
  type    = "A"

  alias {
    name    = "${aws_cloudfront_distribution.sprint_prod_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.sprint_prod_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}