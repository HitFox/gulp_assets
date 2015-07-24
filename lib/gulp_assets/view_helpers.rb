module GulpAssets
  module ViewHelpers
    def gulp_asset_path(path)
      config = Rails.application.config.gulp_assets

      if Rails.env.development?
        "#{config.dev_host}#{config.path}/#{path}"
      else
        path = config.rev_manifest[path] if config.rev_manifest
        "#{config.path}/#{path}"
      end
    end
  end
end
