module ViewHelpers

	# yaml data
	def data
		d||=YAML.load_file(File.join(File.dirname(__FILE__), 'data.yml'))
		return d
	end

	# head > title
	# def pagetitle(page_title)
	#   content_for(:title) { page_title }
	# end
	
end