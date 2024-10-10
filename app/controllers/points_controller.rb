class PointsController < ApplicationController
  def index
    @names = Name.all
  end
end
