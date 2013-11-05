module EventsHelper
  def can_user_check_in
    (!@attendees.include? current_user) && @event.current_event
  end
end
