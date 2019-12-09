resource "aws_cloudfront_distribution" "sprint_dev_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.dev_bucket.bucket_regional_domain_name}"
    origin_id = "S3-${aws_s3_bucket.dev_bucket.bucket}"
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  aliases = ["sprint-dev.dstbtd.dev"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.dev_bucket.bucket}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"    
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:470247399311:certificate/ebf20c5a-65e7-48a4-91b2-e775315366f9"
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method = "sni-only"
  }
  web_acl_id = "e091bc67-8d34-4d01-8b99-b9a153077d16"

  custom_error_response {
    error_code = "403"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = "404"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }
}

resource "aws_cloudfront_distribution" "sprint_staging_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.staging_bucket.bucket_regional_domain_name}"
    origin_id = "S3-${aws_s3_bucket.staging_bucket.bucket}"
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  aliases = ["sprint-staging.dstbtd.dev"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.staging_bucket.bucket}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"    
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:470247399311:certificate/ebf20c5a-65e7-48a4-91b2-e775315366f9"
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method = "sni-only"
  }
  web_acl_id = "e091bc67-8d34-4d01-8b99-b9a153077d16"

  custom_error_response {
    error_code = "403"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = "404"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }
}

resource "aws_cloudfront_distribution" "sprint_prod_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.prod_bucket.bucket_regional_domain_name}"
    origin_id = "S3-${aws_s3_bucket.prod_bucket.bucket}"
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  aliases = ["sprint.distributed.co"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.prod_bucket.bucket}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"    
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:470247399311:certificate/19e781e3-90a3-4d76-8c01-75a68520be39"
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method = "sni-only"
  }
  web_acl_id = "e091bc67-8d34-4d01-8b99-b9a153077d16"

  custom_error_response {
    error_code = "403"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = "404"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }
}