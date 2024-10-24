module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :remote_ip
    def connect
      self.remote_ip = request.remote_ip
      logger.add_tags(self.remote_ip)
    end

    def disconnect
      # Any cleanup work needed when the cable connection is cut
    end
  end
end
