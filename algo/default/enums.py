from enum import Enum


class Direction(Enum):
    """Enumeration object for obstacle's image facings"""
    NORTH = 1
    SOUTH = 2
    EAST = 3
    WEST = 4


class Movement(Enum):
    """Enumeration for robot's 6 possible movement directions"""
    FORWARD = 1
    BACKWARD = 2
    FORWARD_LEFT = 3
    FORWARD_RIGHT = 4
    BACKWARD_LEFT = 5
    BACKWARD_RIGHT = 6


class TurnDirection(Enum):
    """Clockwise or anticlockwise"""
    CLOCKWISE = 0
    ANTICLOCKWISE = 1


