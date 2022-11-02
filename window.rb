require "gtk3"
require_relative 'ITEAD_NP_PN532'
require "thread"
require "ruby-nfc"


rf = Rfid_Itead.new
window = Gtk::Window.new("Gtk::Label sample")
grid = Gtk::Grid.new
@label = Gtk::Label.new("Please, login with your university card")
@label.override_background_color(0,Gdk::RGBA::new(0,0,2,1))
@label.override_color(0,Gdk::RGBA::new(1,1,1,1))
button = Gtk::Button.new(:label => "Clear")
window.set_title("RFID")
window.set_size_request(250,250)
window.set_window_position(:center)
window.set_border_width(10) 
grid.set_row_homogeneous(true)
grid.set_column_homogeneous(true)
window.add(grid)

grid.attach(button,0,6,5,1)
grid.attach(@label,0,0,5,5)
window.show_all

button.signal_connect("clicked") do
    @label.set_markup("Please, login with your university card")
    @label.override_background_color(0,Gdk::RGBA::new(0,0,2,1))
end

thread = Thread.new{
	while true do
	uid = rf.read_uid
	@label.set_markup("Uid: "+ uid)
	@label.override_background_color(0,Gdk::RGBA::new(1,0,0,3))
	
	
	
end
}

window.signal_connect("delete_event"){thread.kill;Gtk.main_quit}
Gtk.main
thread.join
