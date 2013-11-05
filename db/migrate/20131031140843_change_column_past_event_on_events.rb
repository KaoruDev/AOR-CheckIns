class ChangeColumnPastEventOnEvents < ActiveRecord::Migration
  def change
    rename_column :events, :past_event, :current_event
    change_column :events, :current_event, :boolean, :default => true
  end
end
