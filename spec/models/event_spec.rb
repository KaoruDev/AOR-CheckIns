require 'spec_helper'

describe Event do
  let(:past_event){ Event.create(name: "Past Event", current_event: false, date: Chronic.parse("yesterday"), street_address: "716 Congress", city: "Austin", state: "TX")}
  let(:current_event){ Event.create(name: "Current Event", current_event: true, date: Chronic.parse("today"), street_address: "716 Congress", city: "Austin", state: "TX")}
  let(:future_event){ Event.create(name: "Future Event", current_event: true, date: Chronic.parse("tomorrow"), street_address: "716 Congress", city: "Austin", state: "TX")}

  describe "#update_and_get_all" do
    it "returns a hash key-value pair of past events" do
      past_event
      expect(Event.update_and_get_all[:past_events]).to eq([past_event])
    end

    it "returns a hash key-value pair of current events" do
      current_event
      expect(Event.update_and_get_all[:current_events]).to eq([current_event])
    end

    it "returns a hash key-value pair of future events" do
      future_event
      expect(Event.update_and_get_all[:future_events]).to eq([future_event])
    end

    it "returns a hash of events according to date" do
      past_event
      current_event
      future_event
      expect(Event.update_and_get_all).to eq({current_events:[current_event], past_events:[past_event], future_events:[future_event]})
    end

  end
end
