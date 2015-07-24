module GulpAssets
  module ViewHelpers
    def gulp_asset_path(path)
      if Rails.env.development?
        "//localhost:8080/assets/#{path}"
      else
        path = REV_MANIFEST[path] if defined?(REV_MANIFEST)
        "/assets/#{path}"
      end
    end
  end
end
