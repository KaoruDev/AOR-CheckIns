class EventsController < ApplicationController
  def index
    @events = Event.update_and_get_all
    @event = Event.new
  end

  def create
    @events = Event.new(event_params)
    @events.save
    redirect_to root_url
  end

  def check_in

  end

  private

  def event_params
    params[:event][:date] = Chronic.parse(params[:event][:date])
    results = params[:event].permit(:name, :street_address, :city, :state, :date)
  end
end
