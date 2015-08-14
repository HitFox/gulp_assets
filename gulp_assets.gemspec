$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "gulp_assets/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "gulp_assets"
  s.version     = GulpAssets::VERSION
  s.authors     = ["Jan Varwig"]
  s.email       = ["jan.varwig@hitfoxgroup.com"]
  s.homepage    = "http://github.com/hitfox/gulp_assets/"
  s.summary     = "Integrate Gulp with Rails"
  s.description = <<-EOF
    Rails Plugin to augment frontend development with a gulp/webpack based
    workflow.

    - Installs Javascript infrastructure in your Rails project to manage
      frontend assets
    - Provides view helpers to Rails that allow you to easily reference
      gulp generated assets from Rails views
    - Puts Livereload into the Rails middleware stack. This injects the
      Livereload client into Rails-renderd pages, updates are triggered from
      gulp.
  EOF
  s.license     = "MIT"

  s.files = Dir["{lib,template}/**/*", "MIT-LICENSE", "README.md"]

  s.add_runtime_dependency 'rails', '~> 3.0', '>= 3.0.0'
  s.add_runtime_dependency "rack-livereload", "~> 0.3.16"
end
