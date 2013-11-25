class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_event, :except => [:index, :create]

  def index
    @events = Event.update_and_get_all(current_user.is_admin)
    @event = Event.new
  end

  def show
    @attendees = @event.users.all
  end

  def create
    @event = Event.new(event_params)

    @event.save

    redirect_to root_path
  end

  def destroy
    @event.destroy
  end

  def check_in
    if @event.is_user_nearby(params[:longitude], params[:latitude])
      respond_to do |format|
        format.json{
          user = User.find(params[:user_id])
          # check_in = @event.check_ins.find_or_create_by(user_id: params[:user_id])
          PrivatePub.publish_to("/messages/#{@event.id}", "init.addUser(#{user.to_json})");
          render :json => {atEvent: true}
        }
      end
    else
      render :json => { atEvent: false }
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
