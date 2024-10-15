class NamesController < ApplicationController
  def update
    @name = Name.find(params[:id])
    if @name.update(name_params)
      head :partial_content
    else
      head :unprocessable_entity
    end
  end

  private

  def name_params
    params.require(:name).permit(:points)
  end
end
