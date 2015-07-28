namespace :gulp_assets do
  desc "Compile Gulp Assets"
  task :precompile do
    system('gulp precompile')
  end
end

Rake::Task['assets:precompile'].enhance ['gulp_assets:precompile']
