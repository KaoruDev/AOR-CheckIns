class EventsController < ApplicationController
  def index
    @events = Event.update_and_get_all
  end
end
