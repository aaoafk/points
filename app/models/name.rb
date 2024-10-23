class Name < ApplicationRecord
  after_update_commit :broadcast_turbo_refresh

  private
  def broadcast_turbo_refresh
    Turbo::StreamsChannel.broadcast_update_later_to(:names, target: "name_#{self.id}", html: "<span id='name--points' data-points-target='value' class='text-game-yellow text-3xl'>#{self.points}</span>")
  end
end
