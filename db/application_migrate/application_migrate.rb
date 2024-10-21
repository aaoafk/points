class ApplicationMigrate < ActiveRecord::Migration[8.1]
  def change
    create_table "names", force: :cascade do |t|
      t.string "first_name"
      t.string "last_name"
      t.integer "points", default: 0
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
