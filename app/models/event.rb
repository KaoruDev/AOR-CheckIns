class Event < ActiveRecord::Base
  has_many :check_ins
  has_many :users, :through => :check_ins
  
  geocoded_by :full_street_address
  after_validation :geocode

  def self.update_and_get_all
    current_events = self.where(current_event: true)
    self.check_if_event_has_passed current_events
    self.all
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
end
