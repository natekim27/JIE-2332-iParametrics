import io
import os
from shutil import rmtree

from setuptools import find_packages, setup

# Package meta-data.
NAME = 'cwcs-app'
DESCRIPTION = 'Data Visualization Tool for Disaster Relief Management'
URL = 'https://github.com/natekim27/JIE-2332-iParametrics'
EMAIL = 'ariel.mallett@iparametrics.com'
AUTHOR = 'iParametrics'
REQUIRES_PYTHON = '>=3.7.0'
VERSION = '0.1.0'

# What packages are required for this module to be executed?
REQUIRED = [
    'flask_cors',
    'flask',
    'sqlalchemy', 
    'sqlalchemy.orm', 
    'flask_restful',
    'scikit-learn',
    'scipy',
    'numpy',
    'pandas',
    'matplotlib',
    'requests',
]

# Where the magic happens:
setup(
    name=NAME,
    version=VERSION,
    description=DESCRIPTION,
    author=AUTHOR,
    author_email=EMAIL,
    python_requires=REQUIRES_PYTHON,
    url=URL,
    packages=find_packages(exclude=["tests", "*.tests", "*.tests.*", "tests.*"]),
    # If your package is a single module, use this instead of 'packages':
    # py_modules=['mypackage'],

    # entry_points={
    #     'console_scripts': ['mycli=mymodule:cli'],
    # },
    install_requires=REQUIRED,
    include_package_data=True,
    license='MIT',
    classifiers=[
        # Trove classifiers
        # Full list: https://pypi.python.org/pypi?%3Aaction=list_classifiers
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy'
    ],
)