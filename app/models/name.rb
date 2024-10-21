class Name < ApplicationRecord
  after_update_commit :broadcast_turbo_refresh

  private
  def broadcast_turbo_refresh
    Turbo::StreamsChannel.broadcast_refresh_later_to :names
  end
end
