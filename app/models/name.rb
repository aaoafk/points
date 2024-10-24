class Name < ApplicationRecord
  after_update_commit :broadcast_turbo_refresh

  private
  def broadcast_turbo_refresh
    Turbo::StreamsChannel.broadcast_replace_later_to(:names, target: "name_#{self.id}", partial: "points/name_card", locals: { name: self }, method: "morph")
  end
end
