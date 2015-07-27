$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "gulp_assets/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "gulp_assets"
  s.version     = GulpAssets::VERSION
  s.authors     = ["Jan Varwig"]
  s.email       = ["jan@varwig.org"]
  s.homepage    = "http://jan.varwig.org/"
  s.summary     = "Integrate Gulp with Rails"
  s.description = "Integrate Gulp with Rails"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_runtime_dependency "rails", ">= 3.0.0"
end
