class Event < ActiveRecord::Base
  has_many :check_ins
  has_many :users, :through => :check_ins
  
  geocoded_by :full_street_address
  after_validation :geocode

  # Returns a hash consisting of 3 arrays, current_event, future_events, and past_events
  def self.update_and_get_all
    separate_events self.all
  end
  
  def is_user_nearby(longitude, latitude)
    distance = get_user_distance_from_event(longitude.to_f, latitude.to_f)
    if distance < 100
      true
    else
      false
    end
  end

  def full_street_address
    "#{self.street_address}  #{self.city},  #{self.state}"
  end

#######################################################
##
##                 
##                     PROTECTED
##
##
#######################################################

  protected


  def self.check_if_event_has_passed(events)
    events.each do |event|

    end
  end

  def self.separate_events(events)
    results = {
      current_events: [],
      future_events: [],
      past_events: []
    }

    events.each do |event|
      if !event.current_event
        results[:past_events]<< event
      elsif event.date > DateTime.now.at_end_of_day
        results[:future_events]<< event
      elsif event.date < DateTime.now.beginning_of_day
        event.current_event = false
        event.save
        results[:past_events]<< event
      else
        results[:current_events]<< event
      end
    end

    results[:past_events] = sort_by_date results[:past_events]
    results[:future_event] = sort_by_date results[:future_events]

    results
  end

  def self.sort_by_date(events)
    events.sort! do |x, y|
      y.date <=> x.date
    end
  end

  def get_user_distance_from_event(longitude, latitude)
    radius = 6371
    dLon = toRad(self.longitude - longitude)
    dLat = toRad(self.latitude - latitude)
    lat1 = toRad(latitude)
    lat2 = toRad(self.latitude)
    a = Math::sin(dLat/2) * Math::sin(dLat/2) + Math::sin(dLon/2) * Math::sin(dLon/2) * Math::cos(lat1) * Math::cos(lat2)
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
    d = radius * c * 1000 # d is in metesrs
  end

  def toRad(number)
    number * (Math::PI / 180)
  end
end
