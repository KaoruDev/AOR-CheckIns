class EventsController < ApplicationController
  before_action :authenticate_user!

  def index
    @events = Event.update_and_get_all
    @event = Event.new
  end

  def show
    @event = Event.find(params[:id])
    @attendees = @event.attendees.all
  end

  def create
    @events = Event.new(event_params)
    @events.save
    redirect_to root_url
  end

  def check_in
    @event = Event.find(params[:id])
    @event.attendees.create(name: current_user.name, twitter_handle: current_user.twitter_handle)
  end

  private

  def event_params
    params[:event][:date] = Chronic.parse(params[:event][:date])
    results = params[:event].permit(:name, :street_address, :city, :state, :date)
  end
end
