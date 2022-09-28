require 'ruby-nfc'
require 'logger'
require 'colorize'

class Rfid_Itead
  
  # return uid in hexa str
  def read_uid
	readers = NFC::Reader.all
	#p "Available readers: #{readers}"

	# The order of tag types in poll arguments defines priority of tag types
	readers[0].poll(IsoDep::Tag, Mifare::Classic::Tag, Mifare::Ultralight::Tag) do |tag|
		begin
			uid = tag.uid_hex.upcase
			return uid
		end
		end

	end 

end

if __FILE__ == $0
  puts "......Waiting for UID.......".blink
  rf = Rfid_Itead.new
  uid = rf.read_uid
  puts uid
  puts "READ COMPLETED".bold
end
