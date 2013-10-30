class RenameAttendeesToCheckins < ActiveRecord::Migration
  def self.up
    rename_table :attendees, :check_ins
  end

  def self.down
    rename_table :check_ins, :attendees
  end
end
