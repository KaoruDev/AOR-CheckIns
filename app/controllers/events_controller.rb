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
    if @event.is_user_nearby(params[:longitude], params[:latitude])
      respond_to do |format|
        format.json{
          @user = User.find(params[:user_id])
          # check_in = @event.check_ins.build(user_id: params[:user_id])
          # check_in.save
          render :json => {
            avatar: @user.avatar,
            name: @user.name,
            twitter_handle: @user.twitter_handle
          }
        }
      end
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
