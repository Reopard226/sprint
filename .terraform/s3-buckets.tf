resource "aws_s3_bucket" "dev_bucket" {
  bucket = "dstbtd-sprint-dev"
  acl = "public-read"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::dstbtd-sprint-dev/*"
      }
  ]    
}
EOF
}

resource "aws_s3_bucket" "staging_bucket" {
  bucket = "dstbtd-sprint-staging"
  acl = "public-read"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::dstbtd-sprint-staging/*"
      }
  ]    
}
EOF
}

resource "aws_s3_bucket" "prod_bucket" {
  bucket = "dstbtd-sprint-prod"
  acl = "public-read"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::dstbtd-sprint-prod/*"
      }
  ]    
}
EOF
}