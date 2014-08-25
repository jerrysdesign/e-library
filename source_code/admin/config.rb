# Require any additional compass plugins here.
require 'slim'
# require 'sass-globbing'

Slim::Engine.set_default_options :pretty => true, :disable_escape => true, :format => :html5

# Set this to the root of your project when deployed:

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
preferred_syntax = :scss

css_dir = "css" # by Fire.app 
sass_dir = "sass" # by Fire.app 
images_dir = "images" # by Fire.app 
javascripts_dir = "scripts" # by Fire.app 
fireapp_coffeescripts_dir = "coffeescripts" # by Fire.app 
fireapp_livescripts_dir = "livescripts" # by Fire.app 
fireapp_minifyjs_on_build = false # by Fire.app 
fireapp_always_report_on_build = false # by Fire.app 
output_style = :compact # by Fire.app 
relative_assets = true # by Fire.app 
line_comments = true # by Fire.app 
sass_options = {:debug_info=>false} # by Fire.app 
fireapp_coffeescript_options = {:bare=>false} # by Fire.app 
fireapp_livescript_options = {:bare=>false} # by Fire.app