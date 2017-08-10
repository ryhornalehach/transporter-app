CarrierWave.configure do |config|
  if !Rails.env.test?
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AMAZON_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AMAZON_SECRET_KEY"],
      region: "us-east-2"
    }
    config.fog_directory  = ENV["AMAZON_S3_BUCKET"]
  end
end
