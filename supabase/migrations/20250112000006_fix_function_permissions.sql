-- Migration: Fix function permissions for populate_mock_data_for_user

-- Grant execute to both authenticated and anon (for flexibility)
GRANT EXECUTE ON FUNCTION populate_mock_data_for_user(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION populate_mock_data_for_user(UUID) TO anon;



