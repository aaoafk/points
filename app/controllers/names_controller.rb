class NamesController < ApplicationController
  def index
  end

  def update
    @name = Name.find(params[:id])
    respond_to do |format| 
      if @name.update(name_params)
        format.html { redirect_to root_url, status: 303 }
        format.json { redirect_to root_url, status: 200, location: @name }
      else
        head :unprocessable_entity
      end
    end
  end

  private

  def name_params
    params.require(:name).permit(:points)
  end
end
