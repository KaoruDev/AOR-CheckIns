class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_event, :except => [:index, :create]

  def index
    @events = Event.update_and_get_all
    @event = Event.new
  end

  def show
    @attendees = @event.users.all
  end

  def create
    @events = Event.new(event_params)
    @events.save
    redirect_to root_url
  end

  def destroy
    @event.destroy
    redirect_to root_url
  end

  def check_in
    respond_to do |format|
      format.js{
        @user = User.find(params[:user_id])
        check_in = @event.check_ins.build(user_id: params[:user_id])
        check_in.save
        render :json => {}
        #TODO-KAORU  MAKE IT SO IT ONLY RESPONSE TO AJAX REQUEST
      }
    end
  end

  private

  def find_event
    @event = Event.find(params[:id])
  end

  def event_params
    params[:event][:date] = Chronic.parse(params[:event][:date])
    results = params[:event].permit(:name, :street_address, :city, :state, :date)
  end
end
