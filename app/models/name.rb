class Name < ApplicationRecord
  broadcasts_refreshes :name
end
