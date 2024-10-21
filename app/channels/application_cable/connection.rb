module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :remote_ip
    def connect
      self.remote_ip = request.remote_ip
    end
  end
end
