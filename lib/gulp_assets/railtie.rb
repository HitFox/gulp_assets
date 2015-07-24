require 'gulp_assets/view_helpers'

module GulpAssets
  class Railtie < Rails::Railtie
    initializer "gulp_assets.view_helpers" do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end
