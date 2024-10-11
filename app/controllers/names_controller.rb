class NamesController < ApplicationController
  def update
    @name = Name.find(params[:id])
    if @name.update(name_params)
      respond_to do |format| 
        format.html { redirect_to root_url }
        format.turbo_stream { render turbo_stream: turbo_stream.replace(@name, partial: "points/name_card", locals: { name: @name })}
      end
    else
      head :unprocessable_entity
    end
  end

  private

  def name_params
    params.require(:name).permit(:points)
  end
end
