namespace :gulp_assets do
  desc "Compile Gulp Assets"
  task :precompile do
    sh "$(npm bin)/gulp precompile"
  end
end

Rake::Task['assets:precompile'].enhance ['gulp_assets:precompile']
