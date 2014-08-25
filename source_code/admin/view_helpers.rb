module ViewHelpers

	# yaml data
	def data
		d||=YAML.load_file(File.join(File.dirname(__FILE__), 'data.yml'))
		return d
	end

	# 亂數A-D+O+X
	def lorem_q_m
		["A","B","C","D"].sample
	end

	def lorem_q_tf
		['O','X'].sample
	end

	def lorem_q_tf_error
		content_tag(:span, ['O','X'].sample, :class => "error")
	end
	
end