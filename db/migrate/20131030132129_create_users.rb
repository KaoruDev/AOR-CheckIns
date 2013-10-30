class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :twitter_handle
      t.boolean :is_admin

      t.timestamps
    end
  end
end
