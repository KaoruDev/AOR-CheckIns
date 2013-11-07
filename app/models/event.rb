class Event < ActiveRecord::Base
  has_many :check_ins
  has_many :users, :through => :check_ins
  
  geocoded_by :full_street_address
  after_validation :geocode

  def self.update_and_get_all
    current_events = self.where(current_event: true)
    self.check_if_event_has_passed current_events
    events = self.all
    events.sort_by{|x|
      x.date
    }
  end
  
  def is_user_nearby(longitude, latitude)
    distance = get_user_distance_from_event(longitude.to_f, latitude.to_f)
    if distance < 30
      true
    else
      false
    end
  end

  protected


  def self.check_if_event_has_passed(events)
      events.each do |event|
      if event.date < Date.today
        event.current_event = false
        event.save
      end
    end
  end

  def full_street_address
    self.street_address + self.city + self.state
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
