require 'gulp_assets/view_helpers'

module GulpAssets
  class Railtie < Rails::Railtie
    config.gulp_assets = ActiveSupport::OrderedOptions.new

    config.gulp_assets.rev_manifest_path = 'public/assets/rev-manifest.json'
    config.gulp_assets.rev_manifest = nil
    config.gulp_assets.dev_host = "//localhost:8080"
    config.gulp_assets.path = "/assets"

    initializer "gulp_assets.rev_manifest" do
      if File.exist?(config.gulp_assets.rev_manifest_path)
        config.gulp_assets.rev_manifest = JSON.parse(File.read(config.gulp_assets.rev_manifest_path))
      end
    end

    initializer "gulp_assets.view_helpers" do
      ActionView::Base.send :include, ViewHelpers
    end

    rake_tasks do
      load "tasks/gulp_assets_tasks.rake"
    end
  end
end
