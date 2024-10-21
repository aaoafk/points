class PointsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "names"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
