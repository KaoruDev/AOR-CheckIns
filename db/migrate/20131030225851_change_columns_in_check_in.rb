class ChangeColumnsInCheckIn < ActiveRecord::Migration
  def change
    remove_column :check_ins, :name
    remove_column :check_ins, :twitter_handle
    add_reference :check_ins, :user
  end
end
