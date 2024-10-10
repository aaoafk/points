class CreateNames < ActiveRecord::Migration[8.0]
  def change
    create_table :names do |t|
      t.string :first_name
      t.string :last_name
      t.integer :points, default: 0

      t.timestamps
    end
  end
end
