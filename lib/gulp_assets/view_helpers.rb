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

    def gulp_javascript(filename="main", attributes={})
      default_attributes = {
        src: gulp_asset_path("javascripts/#{filename}.js")
      }
      content_tag "script", nil, default_attributes.merge(attributes)
    end

    def gulp_stylesheet(filename="main", attributes={})
      default_attributes = {
        rel: "stylesheet",
        media: "all",
        href: gulp_asset_path("stylesheets/#{filename}.css")
      }
      tag 'link', default_attributes.merge(attributes)
    end

  end
end
