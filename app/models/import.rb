class Import < ApplicationRecord
    mount_uploader :import, ImportsUploader # mounting the file uploader
end
