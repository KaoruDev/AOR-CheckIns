module EventsHelper
  def can_user_check_in
    (!@attendees.include? current_user) && @event.current_event && @event.date < DateTime.now.at_end_of_day
  end
end
